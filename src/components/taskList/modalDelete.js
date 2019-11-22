import React, {useState} from 'react';
import PropTypes from 'prop-types';
import {Button, Header, Icon, Modal} from 'semantic-ui-react';

const ModalDelete = ({deleteTask, itemId}) => {
    const [modalOpen, handleModal] = useState(false);

    const handleOpen = () => handleModal(true);
    const handleClose = () => handleModal(false);

    return (
        <Modal
            trigger={
                <Button
                    onClick={handleOpen}
                    type="button"
                    circular
                    floated="right"
                    icon="trash"
                />
            }
            closeIcon
            open={modalOpen}
            onClose={handleClose}
        >
            <Header icon="trash" content="Delete task" />
            <Modal.Content>
                <p>Are you sure you want to delete this item?</p>
            </Modal.Content>
            <Modal.Actions>
                <Button onClick={handleClose} color="red" inverted>
                    <Icon name="remove" />
                    No
                </Button>
                <Button color="green" inverted onClick={deleteTask(itemId)}>
                    <Icon name="checkmark" /> Yes
                </Button>
            </Modal.Actions>
        </Modal>
    );
};

ModalDelete.propTypes = {
    deleteTask: PropTypes.func.isRequired,
    itemId: PropTypes.string.isRequired
};

export default ModalDelete;
