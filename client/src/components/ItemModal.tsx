import React, { useState } from 'react';
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Form,
  FormGroup,
  Label,
  Input
} from 'reactstrap';
import { connect } from 'react-redux';
import { addItem } from '../flux/actions/itemActions';
import { IItemReduxProps, IItemModal, ITarget } from '../types/interfaces';

const ItemModal = ({ isAuthenticated, addItem }: IItemModal) => {
  const [modal, setModal] = useState(false);
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');

  const handleToggle = () => setModal(!modal);

  const handleChangeName = (e: ITarget) => setName(e.target.value);
  const handleChangeUsername = (e: ITarget) => setUsername(e.target.value);

  const handleOnSubmit = (e: any) => {
    e.preventDefault();

    const newItem = {
      name,
      username
    };

    // Add item via addItem action
    addItem(newItem);
    // Close modal
    handleToggle();
  };

  return (
    <div>
      {isAuthenticated ? (
        <Button
          color="dark"
          style={{ marginBottom: '2rem' }}
          onClick={handleToggle}
        >
          Add Item
        </Button>
      ) : (
        <h4 className="mb-3 ml-4">Please log in to manage items</h4>
      )}

      <Modal isOpen={modal} toggle={handleToggle}>
        <ModalHeader toggle={handleToggle}>
          Add To Family Shopping List
        </ModalHeader>
        <ModalBody>
          <Form onSubmit={handleOnSubmit}>
            <FormGroup>
              <Label for="item">Item</Label>
              <Input
                type="text"
                name="name"
                id="item"
                placeholder="Add shopping item"
                className="mb-3"
                onChange={handleChangeName}
              />
              <Label for="item">Purchase For</Label>
              <Input
                type="text"
                name="username"
                id="item"
                placeholder="Add your name"
                className="mb-3"
                onChange={handleChangeUsername}
              />
              <Button color="dark" style={{ marginTop: '2rem' }} block>
                Add Item
              </Button>
            </FormGroup>
          </Form>
        </ModalBody>
      </Modal>
    </div>
  );
};

const mapStateToProps = (state: IItemReduxProps) => ({
  item: state.item,
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, { addItem })(ItemModal);
