type Props = {
  image: React.ReactElement;
};

export default function SidebarButton({ image }: Props) {
  return <li>{image}</li>;
}
