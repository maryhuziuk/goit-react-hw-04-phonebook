import React, { useState, useEffect } from 'react';
import { ContactsList } from 'components/ContactsList/ContactsList.jsx';
import { ContactsForm } from 'components/ContactForm/ContactForm';
import { nanoid } from 'nanoid';
import { Filter } from 'components/Filter/Filter.jsx';
import { saveLocalStorage, loadLocalStorage } from '../Utils/LocalStorage.js'

import {
  Container,
  Section,
  Wrapper,
  Title,
  SectionTitle,
  Message,
} from './App.styled.js';



export const App = () => {
  const [contacts, setContacts] = useState([
    { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
    { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
    { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
    { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
  ]);
  const [filter, setFilter] = useState('');
  
 
  useEffect(() => {
    const savedContacts = loadLocalStorage('contacts');

    if (savedContacts) {
      setContacts(savedContacts);
    }
  }, []);

  useEffect(() => {
    saveLocalStorage('contacts', contacts);
  }, [contacts]);

  const addContact = ({ name, number }) => {
    const contact = { id: nanoid(), name, number };
    const normalizedName = name.toLowerCase();

    if (contacts.find(contact => contact.name.toLowerCase() === normalizedName)) {
      return alert(`${name} is already in contacts!`);
    }

    setContacts(prevContacts => [contact, ...prevContacts]);
  };


  const deleteContact = contactId => {
    setContacts(prevContacts =>
      prevContacts.filter(contact => contact.id !== contactId)
    );
  };

   const filterContacts = event => {
    setFilter(event.currentTarget.value );
  };

  const getFilteredContacts = () => {
    const normalizedFilter = filter.toLowerCase();
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter)
    );
  };

  const filteredContacts = getFilteredContacts();

    return (
      <Container>
        <Title>Phonebook</Title>
        <Wrapper>
          <Section>
            <SectionTitle>Add contact</SectionTitle>
            <ContactsForm onSubmit={addContact} />
          </Section>
          <Section className="contacts">
            <SectionTitle>Contacts</SectionTitle>
            {contacts.length !== 0 ? (
              <>
                <Filter value={filter} onChangeFilter={filterContacts} />
                {filteredContacts.length !== 0 ? (
                    <ContactsList
                      contacts={filteredContacts}
                      onDeleteContact={deleteContact}
                    />
                ) : (
                  <Message>Nothing found !</Message>
                )}
              </>
            ) : (
              <Message>
                There are no contacts in your phonebook. Please add your first
                contact!
              </Message>
            )}
          </Section>
        </Wrapper>
      </Container>
    );
  }
