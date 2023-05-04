import {MutationTuple, useMutation} from "@apollo/client";
import {gql} from "apollo-boost";
import {EMAIL} from "../config";
import {v4} from "uuid";
import {useEffect, useState} from "react";

type useMailsProps = {
    mailsTo: string[],
    subject: string,
    body: string,
    mailFrom: string
}

export const useMails = ({mailsTo, mailFrom, body, subject}: useMailsProps) => {

    const [arr, setArr] = useState<[() => Promise<void>][]>()

    useEffect(() => {
       const digestedBody = body.split('"').join('')
        const digestedSubject = subject.split('"').join('')
        // @ts-ignore
        setArr(mailsTo.map(mailTo => useMutation(gql`
            mutation SEND_EMAIL {
                sendEmail(
                    input: {
                        to: "${mailTo}"
                        from: "${mailFrom}"
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
        `)))

}, [body, subject])

    return [arr]

}
