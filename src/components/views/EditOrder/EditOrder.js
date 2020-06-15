import React from 'react';
import Order from '../Order/Order';
import EditOrderBottomBar from '../../features/EditOrderBottomBar/EditOrderBottomBar';
import PropTypes from 'prop-types';

const EditOrder = ({
  fetchShowData,
  showData,
  isFetching,
  isFetchingError,
  token,
  userData,
  orderedSeats,
  fetchSeats,
  updateSeats,
  match,
  orderToEdit,
  editOrder,
}) => {

  return ( 
    <>
      <Order 
        fetchShowData={fetchShowData}
        showData={showData}
        isFetching={isFetching}
        isFetchingError={isFetchingError}
        token={token}
        userData={userData}
        orderedSeats={orderedSeats}
        fetchSeats={fetchSeats}
        updateSeats={updateSeats}
        match={match}
        isEditing
        orderToEdit={orderToEdit}
        orderTickets={editOrder}
      />
      <EditOrderBottomBar 
        orderToEdit={orderToEdit}
      />
    </>

   );
}

EditOrder.propTypes = {
  fetchShowData: PropTypes.func.isRequired,
  showData: PropTypes.object,
  isFetching: PropTypes.bool.isRequired,
  isFetchingError: PropTypes.bool.isRequired,
  token: PropTypes.string,
  userData: PropTypes.object,
  orderedSeats: PropTypes.array,
  fetchSeats: PropTypes.func.isRequired,
  updateSeats: PropTypes.func.isRequired,
  orderToEdit: PropTypes.object.isRequired,
  editOrder: PropTypes.func.isRequired,
}

 
export default EditOrder;