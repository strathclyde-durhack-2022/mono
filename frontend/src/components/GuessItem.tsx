import { Menu } from "@headlessui/react";

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

const GuessItem = (props: {
  name: string;
  onChange: (selected: string) => void;
}) => {
  return (
    <Menu.Item>
      {({ active }) => (
        <a
          onClick={() => props.onChange(props.name)}
          className={classNames(
            active ? "bg-gray-100 text-gray-900" : "text-gray-700",
            "block px-4 py-2 text-sm"
          )}
        >
          {props.name}
        </a>
      )}
    </Menu.Item>
  );
};

export default GuessItem;
