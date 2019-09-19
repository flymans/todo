import React from 'react';
import PropTypes from 'prop-types';
import {Button, Header, Icon, Modal} from 'semantic-ui-react';

const ModalDelete = ({deleteTask, itemId}) => (
    <Modal
        trigger={<Button type="button" circular floated="right" icon="trash" />}
        closeIcon
    >
        <Header icon="trash" content="Delete task" />
        <Modal.Content>
            <p>Are you sure you want to delete this item?</p>
        </Modal.Content>
        <Modal.Actions>
            <Button color="green" inverted onClick={deleteTask(itemId)}>
                <Icon name="checkmark" /> Yes
            </Button>
        </Modal.Actions>
    </Modal>
);

ModalDelete.propTypes = {
    deleteTask: PropTypes.func.isRequired,
    itemId: PropTypes.string.isRequired
};

export default ModalDelete;
