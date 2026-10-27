const router = {
  push: () => {},
  replace: () => {},
  refresh: () => {},
  back: () => {},
  forward: () => {},
  prefetch: () => {},
};

const searchParams = new URLSearchParams();

export const useRouter = () => router;
export const usePathname = () => '/';
export const useSearchParams = () => searchParams;
export const useParams = () => ({});
export const notFound = () => {
  throw new Error('notFound');
};
export const redirect = () => {};
