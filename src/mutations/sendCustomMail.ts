import {gql} from "apollo-boost";
import {v4} from "uuid";
import {useEffect, useState} from "react";

type sendCustomMailProps = {
    mailTo: string,
    subject: string,
    body: string,
    mailFrom: string
}

export const sendCustomMail = ({mailTo, mailFrom, body, subject}: sendCustomMailProps) => {
    const [digestedBody ,setDigestedBody] = useState('')
    const [digestedSubject ,setDigestedSubject] = useState('')
    const [digestedMailTo ,setDigestedMailTo] = useState('')
    const [digestedMailFrom ,setDigestedMailFrom] = useState('')


    useEffect(() => {

        if ([body, subject, mailTo, mailFrom].every(item => item !== undefined)) {
            const digestedBody = body.split('"').join('')
            const digestedSubject = subject.split('"').join('')
            const digestedMailTo = mailTo.split('"').join('')
            const digestedMailFrom = mailFrom.split('"').join('')
            setDigestedBody(digestedBody)
            setDigestedSubject(digestedSubject)
            setDigestedMailTo(digestedMailTo)
            setDigestedMailFrom(digestedMailFrom)
        }

    }, [body, subject, mailTo, mailFrom])

return gql`
    mutation SEND_EMAIL {
        sendEmail(
            input: {
                to: "${digestedMailTo}"
                from: "${digestedMailFrom}"
                subject: "${digestedSubject}"
                body: "${digestedBody}"
                clientMutationId: "${v4()}"
            }
        ) {
            origin
            sent
            message
        }
    }
`
}
