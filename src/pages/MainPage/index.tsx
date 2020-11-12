import { LeftOutlined, SearchOutlined } from "@ant-design/icons";
import { Button, Col, message, Row } from "antd";
import Search from "antd/lib/input/Search";
import * as React from "react";
import { useHistory, useLocation } from "react-router-dom";
import { Content } from "../../components/Content";
import './styles.less';

export const MainPage = () => {

    const history = useHistory();
    const location = useLocation();

    const isFrontPage = location.pathname === '/';

    const [searchText, setSearchText] = React.useState<string>("");
    const [showSearch, setShowSearch] = React.useState<boolean>(false);

    const handleOnClickSearch = () => {
        if(searchText.trim().length > 0) { 
            history.push(`/busca/${searchText}`);
            setShowSearch(false);
        } else {
            message.info("Campo de pesquisa em branco.");
        }
    };

    return (
        <>
            <Row
                justify={isFrontPage ? 'center' : 'space-between'}
                align="middle"
                className={isFrontPage ? 'sb-container' : 'sb-animation sb-shadow'}
                style={{paddingLeft: '2vw', paddingRight: '2vw'}} >
                {
                !isFrontPage ?
                    <Button
                        type='primary'
                        shape='circle'
                        size='large'
                        onClick={() => history.goBack()}>
                        {<LeftOutlined />}
                    </Button>
                : null
                }
                <Col
                    xs={20} md={12}
                    style={{maxWidth: '550px'}}
                    className={!isFrontPage && !showSearch ? 'sb-hide box-shadow' : 'box-shadow'}>
                    <Search
                        placeholder="Pesquisar"
                        aria-label="campo de pesquisa"
                        onChange={e => setSearchText(e.target.value)}
                        onSearch={() => handleOnClickSearch()}
                        size='large'
                        onBlur={() => setShowSearch(false)}
                    />
                </Col>
                {
                !isFrontPage && !showSearch ?
                    <Button
                        type='primary'
                        className='search-btn'
                        shape='circle'
                        size='large'
                        onClick={() => setShowSearch(true)}>
                        <SearchOutlined />
                    </Button>
                : null
                }
            </Row>
            <Content visible={!isFrontPage}/>
        </>
    );
};