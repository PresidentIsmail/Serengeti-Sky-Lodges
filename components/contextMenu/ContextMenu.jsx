const ContextMenu = ({ children }) => {
  return (
    <div className="absolute right-16 top-0 overflow-hidden rounded-xl bg-white shadow-md">
      <div className="flex cursor-pointer flex-col">{children}</div>
    </div>
  );
};

export default ContextMenu;
