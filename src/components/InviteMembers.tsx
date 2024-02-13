import { useState, useEffect } from 'react'
import {  Button, Space, Table, Text, TextInput, Title } from '@mantine/core';

import { useUser, useOrganization, useOrganizationList,
         UserButton, SignOutButton, 
         SignInButton, SignUpButton, SignedIn, SignedOut, SignIn } from "@clerk/clerk-react" 

const InviteMembers = () => {
    const { isSignedIn, user, isLoaded } = useUser();
    const { organization, invitations } = useOrganization( { invitations: true });
    const { setActive } = useOrganizationList();
    const [ invitedEmail, setInvitedEmail ] = useState('');

    if (!isLoaded) {
        return null;
    }

    const storeInviteEmail = (e) => {
        setInvitedEmail(e.target.value);
    };
    
    const sendInvite = async () => {
        if (invitedEmail !== null) {
            console.log(`inviting ${invitedEmail}`);
            const setActiveResults = await setActive(organization.id);
            const results = await organization.inviteMember ({ emailAddress: invitedEmail, role: 'org:member' });
            console.log(`Clerk invite returned: ${results}`);
        }
    };
  
    // Display who has been invited to this organization
    return (
        <>
            {isSignedIn && isLoaded && (
                <div>
                    <Title order={3}> Already invited to : {organization.name}</Title>
                <Table verticalSpacing="xs" highlightOnHover withColumnBorders withTableBorder>
                    <Table.Thead>
                      <Table.Tr>
                        <Table.Th>Email</Table.Th>
                      </Table.Tr>
                    </Table.Thead>
                    <Table.Tbody>
                      {invitations.data.map((invitation) => (
                          <Table.Tr key={invitation.id || invitation.emailAddress}>
                            <Table.Td align="left">
                              {invitation.emailAddress} (invited to be a {invitation.role === 'org:member' ? 'member' : 'admin'})
                            </Table.Td>
                          </Table.Tr>
                      ))}
                     </Table.Tbody>
                  </Table>
                    
                    <Space h="xl" />
                    <TextInput
                      value={invitedEmail}
                      onChange={(e) => { storeInviteEmail(e) }}
                      placeholder="foo@bar.com"
                      size="md"
                    />
                    <Space h="sm" />

                    <Button onClick={sendInvite} size="md">Invite this email to organization</Button>
                    <Space h="lg" />

                </div>
            )}
        </>
    );
};

export default InviteMembers;
