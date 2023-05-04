import {gql} from "apollo-boost";
import {EMAIL} from "../config";
import {v4} from "uuid";
import {setState} from "gatsby/dist/utils/worker/child/state";
import {useEffect, useState} from "react";

export const SEND_MAIL = ({
                              phone,
                              name,
                              email,
                              subject
                          }: { phone?: string, name?: string, email?: string, subject: string }) => {

    const [body, setBody] = useState<string>('')

    useEffect(() => {
        const mailBody = `${phone ? `<p><strong>Телефон:</strong>${phone}<p>` : ``}${name ? `<p><strong>ФИО:</strong>${name}<p>` : ``}${email ? `<p><strong>Email:</strong>${email}<p>` : ``}`
        const res = mailBody.split('"').join('')
        setBody(res)
    }, [phone, name, email])

    return gql`
        mutation SEND_EMAIL {
            sendEmail(
                input: {
                    to: "${EMAIL}"
                    from: "mail@testingplace.ru"
                    subject: "${subject ? subject : 'Заявка с сайта Автоклуба "Ангел"'}"
                body: "${body}"
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
