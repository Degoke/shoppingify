import SidebarButton from './SidebarButton';

type SidebarItem = {
  image: React.ReactElement;
};

const sidebarItems: SidebarItem[] = [
  {
    image: <span className="material-icons">format_list_bulleted</span>,
  },
];
export default function Sidebar() {
  return (
    <aside>
      <h1>SHP</h1>
      <ul>
        {sidebarItems.map((item) => (
          <SidebarButton image={item.image} />
        ))}
      </ul>
    </aside>
  );
}
