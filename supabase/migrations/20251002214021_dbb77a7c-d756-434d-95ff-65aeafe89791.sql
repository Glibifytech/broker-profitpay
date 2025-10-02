-- Assign admin role to specific email
-- This will run after the user signs up through the app

-- Insert admin role for the specified user
INSERT INTO public.user_roles (user_id, role)
SELECT id, 'admin'::app_role
FROM auth.users
WHERE email = 'naxine1478@scanue.com'
ON CONFLICT (user_id, role) DO NOTHING;