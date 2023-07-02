const Container = (props: { children: React.ReactNode }) => {
  return (
    <div className=" w-screen flex m-auto md:w-[90%] md:h-screen bg-blue-50">
      {props.children}
    </div>
  );
};

export default Container;
