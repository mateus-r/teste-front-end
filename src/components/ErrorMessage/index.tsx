import { FrownOutlined } from "@ant-design/icons";
import { Col, Row, Typography } from "antd";
import Title from "antd/lib/typography/Title";
import * as React from "react";

export const ErrorMessage = () => {
    return(
        <Row justify='center' align='middle'>
            <Col>
                <Title><FrownOutlined /></Title>
                <Typography>
                    Não encontramos vídeos com o termo buscado.<br />
                    Utilize outras palavras-chave.
                </Typography>
            </Col>
        </Row>
    );
}