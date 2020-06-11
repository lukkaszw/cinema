import { connect } from 'react-redux';
import UserOrders from './UserOrders';

import { getUserOrders } from '../../../redux/reducers/userRedux/userRedux';

const mapStateToProps = (state) => ({
  orders: getUserOrders(state),
});

export default connect(mapStateToProps)(UserOrders);