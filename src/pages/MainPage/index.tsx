import { SearchOutlined } from "@ant-design/icons";
import { Col, message, Row } from "antd";
import Search from "antd/lib/input/Search";
import * as React from "react";
import { useHistory, useLocation } from "react-router-dom";
import { Content } from "../../components/Content";
import './styles.less';

export const MainPage = () => {

    const history = useHistory();
    const location = useLocation();

    const [collapsed, setCollapsed] = React.useState<boolean>(false);
    const [searchText, setSearchText] = React.useState<string>("");

    message.config({
        maxCount: 3,
    });

    const handleOnClickSearch = () => {
        if(searchText.trim().length > 0) { 
            setCollapsed(true);
            history.push(`/busca/${searchText}`);
        } else {
            message.info("Campo de pesquisa em branco.");
        }
    };

    return (
        <>
            <Row
                justify="center"
                align="middle"
                className={collapsed || location.pathname !== '/' ? 'sb-animation sb-shadow' : 'sb-container'}>
                <Col xs={20} md={12} style={{maxWidth: '550px'}}>
                    <Search
                        placeholder="Pesquisar"
                        aria-label="campo de pesquisa"
                        onChange={e => setSearchText(e.target.value)}
                        // enterButton={<SearchOutlined />}
                        onSearch={() => handleOnClickSearch()}
                    />
                </Col>
            </Row>
            <Content />
        </>
    );
};