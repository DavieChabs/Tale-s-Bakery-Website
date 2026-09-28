CREATE TABLE public.reviews (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL CHECK (char_length(trim(name)) BETWEEN 2 AND 60),
  rating smallint NOT NULL DEFAULT 5 CHECK (rating BETWEEN 1 AND 5),
  message text NOT NULL CHECK (char_length(trim(message)) BETWEEN 5 AND 600),
  created_at timestamptz NOT NULL DEFAULT now()
);

GRANT SELECT, INSERT ON public.reviews TO anon;
GRANT SELECT, INSERT ON public.reviews TO authenticated;
GRANT ALL ON public.reviews TO service_role;

ALTER TABLE public.reviews ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read reviews" ON public.reviews FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "Anyone can leave a review" ON public.reviews FOR INSERT TO anon, authenticated WITH CHECK (true);

CREATE INDEX reviews_created_at_idx ON public.reviews (created_at DESC);