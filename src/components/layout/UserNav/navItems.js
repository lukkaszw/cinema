import { faCog, faEnvelope, faTicketAlt } from '@fortawesome/free-solid-svg-icons';

const navItems = [
  {
    to: '/user',
    name: 'News',
    icon: faEnvelope,
  },
  {
    to: '/user/orders',
    name: 'Orders',
    icon: faTicketAlt,
  },
  {
    to: '/user/settings',
    name: 'Settings',
    icon: faCog,
  },
]

export default navItems;