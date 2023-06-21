import PropTypes from 'prop-types';
import React, { useState } from 'react';
import {
    LabelStyle,
    FormStyle,
    InputStyle,
    ButtonStyle,
} from './ContactForm.styled';
  

export const ContactsForm = ({ onSubmit }) => {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  const handleSubmit = event => {
    event.preventDefault();
    onSubmit({ name, number });
    reset();
  };

  const handleChange = event => {
    const { name, value } = event.target;
    if (name === 'name') {
      setName(value);
    } else if (name === 'number') {
      setNumber(value);
    }
  };

  const reset = () => {
    setName('');
    setNumber('');
  };
    
        return (
          <FormStyle onSubmit={handleSubmit}>
            <LabelStyle>
              Name
              <InputStyle
                type="text"
                name="name"
                value={name}
                onChange={handleChange}
                pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
                title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
                required
              />
            </LabelStyle>
    
            <LabelStyle>
              Number
              <InputStyle
                type="tel"
                name="number"
                value={number}
                onChange={handleChange}
                pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
                title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
                required
              />
            </LabelStyle>
    
            <ButtonStyle type="submit">Add contact </ButtonStyle>
          </FormStyle>
        );
      }
    
ContactsForm.propTypes = {
    onSubmit: PropTypes.func.isRequired,
};
  

