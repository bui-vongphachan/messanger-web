const Sidebar = (props: { children: React.ReactNode }) => {
  return (
    <aside className=" max-w-[30%] min-w-[300px] bg-blue-100">
      {props.children}
    </aside>
  );
};

export default Sidebar;
