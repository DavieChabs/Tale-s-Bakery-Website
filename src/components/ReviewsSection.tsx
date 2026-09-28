import { useState, type FormEvent } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Quote, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";

type Review = { id: string; name: string; rating: number; message: string; created_at: string };

const reviewsQuery = {
  queryKey: ["reviews"],
  queryFn: async (): Promise<Review[]> => {
    const { data, error } = await supabase
      .from("reviews")
      .select("id, name, rating, message, created_at")
      .order("created_at", { ascending: false })
      .limit(12);
    if (error) throw error;
    return (data ?? []) as Review[];
  },
};

function Stars({ value, className = "" }: { value: number; className?: string }) {
  return (
    <div className={`flex gap-0.5 ${className}`} aria-label={`${value} out of 5 stars`}>
      {[1, 2, 3, 4, 5].map((n) => (
        <Star key={n} size={16} className={n <= value ? "fill-accent text-accent" : "text-primary-foreground/25"} />
      ))}
    </div>
  );
}

export function ReviewsSection({ SectionLabel }: { SectionLabel: (props: { children: string; light?: boolean }) => React.ReactElement }) {
  const queryClient = useQueryClient();
  const { data: reviews = [], isLoading } = useQuery(reviewsQuery);
  const [rating, setRating] = useState(5);
  const [sent, setSent] = useState(false);

  const mutation = useMutation({
    mutationFn: async (review: { name: string; rating: number; message: string }) => {
      const { error } = await supabase.from("reviews").insert(review);
      if (error) throw error;
    },
    onSuccess: () => {
      setSent(true);
      setRating(5);
      queryClient.invalidateQueries({ queryKey: ["reviews"] });
    },
  });

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    setSent(false);
    mutation.mutate(
      {
        name: String(data.get("review-name") ?? "").trim(),
        rating,
        message: String(data.get("review-message") ?? "").trim(),
      },
      { onSuccess: () => form.reset() },
    );
  }

  return (
    <section id="reviews" className="scroll-mt-20 bg-primary py-24 text-primary-foreground lg:py-28">
      <div className="mx-auto max-w-7xl px-5 lg:px-10">
        <div className="max-w-xl">
          <SectionLabel light>Kind words</SectionLabel>
          <h2 className="mt-4 font-display text-4xl sm:text-5xl">Baked into their memories.</h2>
          <p className="mt-4 text-sm leading-7 text-primary-foreground/70">
            Ordered from us before? Leave a review below — it appears on this page straight away.
          </p>
        </div>

        <div className="mt-12 grid gap-10 lg:grid-cols-[1.25fr_0.75fr] lg:gap-14">
          <div className="grid gap-5 sm:grid-cols-2">
            {isLoading && <p className="text-sm text-primary-foreground/60">Loading reviews…</p>}
            {!isLoading && reviews.length === 0 && (
              <blockquote className="border border-primary-foreground/15 p-6 sm:col-span-2">
                <Quote className="text-accent" />
                <p className="mt-5 font-display text-xl leading-8">
                  No reviews yet — be the first to share your experience with Tale’s Bakery.
                </p>
              </blockquote>
            )}
            {reviews.map((review) => (
              <blockquote key={review.id} className="border border-primary-foreground/15 p-6">
                <div className="flex items-center justify-between">
                  <Quote className="text-accent" />
                  <Stars value={review.rating} />
                </div>
                <p className="mt-5 font-display text-xl leading-8">“{review.message}”</p>
                <footer className="mt-5 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs font-bold uppercase tracking-[0.15em] text-accent">
                  <span>— {review.name}</span>
                  <span className="font-medium tracking-normal normal-case text-primary-foreground/45">
                    {new Date(review.created_at).toLocaleDateString(undefined, { day: "numeric", month: "short", year: "numeric" })}
                  </span>
                </footer>
              </blockquote>
            ))}
          </div>

          <form onSubmit={submit} className="h-fit border border-primary-foreground/15 bg-primary-foreground/5 p-6 sm:p-8">
            <p className="font-display text-2xl">Leave a review</p>

            <fieldset className="mt-5">
              <legend className="text-sm font-semibold">Your rating</legend>
              <div className="mt-2 flex gap-1">
                {[1, 2, 3, 4, 5].map((n) => (
                  <button
                    key={n}
                    type="button"
                    onClick={() => setRating(n)}
                    aria-label={`${n} star${n > 1 ? "s" : ""}`}
                    aria-pressed={rating === n}
                    className="p-1 transition-transform hover:scale-115"
                  >
                    <Star size={24} className={n <= rating ? "fill-accent text-accent" : "text-primary-foreground/30"} />
                  </button>
                ))}
              </div>
            </fieldset>

            <label className="mt-5 block text-sm font-semibold" htmlFor="review-name">Your name</label>
            <input
              id="review-name"
              name="review-name"
              type="text"
              required
              minLength={2}
              maxLength={60}
              placeholder="Name"
              className="mt-2 h-12 w-full border border-primary-foreground/20 bg-primary px-4 text-base text-primary-foreground outline-none placeholder:text-primary-foreground/40 focus:ring-2 focus:ring-accent"
            />

            <label className="mt-5 block text-sm font-semibold" htmlFor="review-message">Your review</label>
            <textarea
              id="review-message"
              name="review-message"
              required
              minLength={5}
              maxLength={600}
              rows={5}
              placeholder="Tell others what you ordered and how it was..."
              className="mt-2 w-full resize-none border border-primary-foreground/20 bg-primary px-4 py-3 text-base text-primary-foreground outline-none placeholder:text-primary-foreground/40 focus:ring-2 focus:ring-accent"
            />

            <Button type="submit" size="lg" disabled={mutation.isPending} className="mt-5 w-full bg-accent text-accent-foreground hover:bg-accent/90">
              {mutation.isPending ? "Posting…" : "Post review"}
            </Button>

            {sent && <p className="mt-3 text-sm text-accent">Thank you! Your review is now live.</p>}
            {mutation.isError && <p className="mt-3 text-sm text-accent">Sorry, that didn’t send. Please try again.</p>}
          </form>
        </div>
      </div>
    </section>
  );
}
