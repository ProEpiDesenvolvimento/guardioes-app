import React, { useState } from 'react'

import {
    Button,
    Container,
    KeyboardScrollView,
    SendContainer,
    SendText,
} from '../../../components/NormalForms'

import InstitutionSelector from '../../../components/Groups/InstitutionSelector'
import LoadingModal from '../../../components/Groups/LoadingModal'
import { validatePerson } from '../../../utils/consts'

const EditarGrupo = ({ navigation, route }) => {
    const { person } = route.params

    const [group, setGroup] = useState(person.group)
    const [groupId, setGroupId] = useState(person.group_id)
    const [idCode, setIdCode] = useState(person.identification_code)
    const [vigilance, setVigilance] = useState(person.is_vigilance)
    const [phone, setPhone] = useState(person.phone)

    const [institutionError, setInstitutionError] = useState(null)
    const [loadingAlert, setLoadingAlert] = useState(false)

    const handleEdit = () => {
        if (!validatePerson({}, institutionError)) return

        const newPerson = {
            ...person,
            group,
            group_id: groupId,
            identification_code: idCode,
            is_vigilance: vigilance,
            phone,
        }

        navigation.navigate('EditarPerfil', { person: newPerson })
    }

    const setInstitutionCallback = (group, groupId, idCode) => {
        setGroup(group)
        setGroupId(groupId)
        setIdCode(idCode)

        if (!groupId) {
            setVigilance(false)
            setPhone(null)
        }
    }

    const setInstitutionComponentError = (error) => {
        setInstitutionError(error)
    }

    return (
        <Container>
            <KeyboardScrollView>
                <InstitutionSelector
                    userGroupId={groupId}
                    userIdCode={idCode}
                    setAlert={setLoadingAlert}
                    setInstitutionCallback={setInstitutionCallback}
                    setErrorCallback={setInstitutionComponentError}
                />

                <Button onPress={() => handleEdit()}>
                    <SendContainer>
                        <SendText>Salvar</SendText>
                    </SendContainer>
                </Button>
            </KeyboardScrollView>

            <LoadingModal show={loadingAlert} />
        </Container>
    )
}

export default EditarGrupo
