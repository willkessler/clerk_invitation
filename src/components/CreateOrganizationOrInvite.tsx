import { useState, useEffect } from 'react'
import {  Button, Space, Text, TextInput } from '@mantine/core';

import { useUser, useOrganization, useOrganizationList,
         UserButton, SignOutButton, 
         SignInButton, SignUpButton, SignedIn, SignedOut, SignIn } from "@clerk/clerk-react" 

const CreateOrganizationOrInvite = () => {
    const { isSignedIn, user, isLoaded } = useUser();
    const { organization } = useOrganization();
    const { setActive } = useOrganizationList();
    const [ orgName, setOrgName ] = useState('testorg1');

    const createOrg = async () => {
        const clerkOrganization = await createOrganization({name: orgName});
        console.log(`We got this org back from createOrganization: ${clerkOrganization}`);
    }
    
    if (!isLoaded) {
        return null;
    }

    const persistOrgName = (e) => {
        setOrgName(e.target.value);
    };
    
    return (
        <>

            {isSignedIn && (
                <div>
                    <TextInput
                value={orgName}
                onChange={(e) => { persistOrgName(e) }}
                placeholder="Enter desired clerk organization name"
                size="md"
                    />
                    <Space h="md" />

                    <Button onClick={createOrg} size="md">Create Clerk Organization</Button>
                    </div>
            )}

        {!isSignedIn && (
            <SignIn />
        )}


        </>
    );
};

export default CreateOrganizationOrInvite;
