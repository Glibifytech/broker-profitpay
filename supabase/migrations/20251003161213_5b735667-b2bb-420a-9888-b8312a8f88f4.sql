-- Create profiles for existing users who don't have one
INSERT INTO public.profiles (id, email, balance)
SELECT 
  au.id,
  au.email,
  0.00
FROM auth.users au
LEFT JOIN public.profiles p ON au.id = p.id
WHERE p.id IS NULL;