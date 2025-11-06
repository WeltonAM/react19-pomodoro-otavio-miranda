import { Link } from 'react-router';

type RouterLinkProps = {
  children: React.ReactNode;
  to: string;
} & React.ComponentProps<'a'>;

export function RouterLink({ children, to, ...props }: RouterLinkProps) {
  return (
    <Link to={to} {...props}>
      {children}
    </Link>
  );
}