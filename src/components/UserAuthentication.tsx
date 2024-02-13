import { useState, useEffect } from 'react'
import CreateOrganizationOrInvite from './CreateOrganizationOrInvite';
import {  Button, Space, Text, TextInput } from '@mantine/core';
import InviteMembers from './InviteMembers';

import { useUser, useOrganization, useOrganizationList,
         UserButton, SignOutButton, 
         SignInButton, SignUpButton, SignedIn, SignedOut, SignIn } from "@clerk/clerk-react" 

const UserAuthentication = () => {
  const { isSignedIn, user, isLoaded } = useUser();
  const { organization } = useOrganization();
  const { setActive } = useOrganizationList();
  let organizationName = '';

  if (!isLoaded) {
    return null;
  }

  if (user.organizationMemberships &&
      user.organizationMemberships.length > 0 &&
      user.organizationMemberships[0].organization &&
      user.organizationMemberships[0].organization.name)
  {
    organizationName = user.organizationMemberships[0].organization.name;
  }

  return (
      <>

    {!isSignedIn && (
        <SignIn />
    )}

    {isSignedIn && (
        <>
        <Space h="md" />
        <Text align="left" size="lg">Name: {user.fullName}</Text>
        <Text align="left" size="lg">Email: {user.primaryEmailAddress.emailAddress}</Text>
        <Text align="left" size="lg">Current organization: {organizationName}</Text>
          <CreateOrganizationOrInvite />
          <br /><br />
          <InviteMembers />
        </>
      )}


    {isSignedIn && (
        <>
          <br /><br />
          <SignOutButton />
        </>
    )}

      </>

  );
};

export default UserAuthentication;
