import { Menu } from '@headlessui/react'

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

const GuessItem = (props) => {
    return (
        <Menu.Item>
          {({ active }) => (
            <a
              href="#"
              className={classNames(
                active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                'block px-4 py-2 text-sm'
              )}
            >
              {props.name}
            </a>
          )}
      </Menu.Item>
    )
}

export default GuessItem