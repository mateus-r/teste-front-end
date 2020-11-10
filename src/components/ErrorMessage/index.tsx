import { Typography } from "antd";
import Paragraph from "antd/lib/typography/Paragraph";
import * as React from "react";
import './styles.less';

export const ErrorMessage = () => {
    return(
        <Typography>
            {/* <Title className='rotate-90-degree'>:(</Title> */}
            <Paragraph>Não encontramos vídeos com o termo buscado.</Paragraph>
            <Paragraph>Utilize outras palavras-chave.</Paragraph>
        </Typography>
    );
}