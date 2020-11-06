import { Col, message, Row } from "antd";
import Search from "antd/lib/input/Search";
import * as React from "react";
import { SearchResults } from "../../components/SearchResults";
import { VideoContent } from "../../components/VideoContent";
import { loadDetails, search } from "./actions";
import './style.css';

export const MainPage = (): JSX.Element => {
    const [loading, setLoading] = React.useState<boolean>(false);
    const [showSearchResults, setShowSearchResults] = React.useState<boolean>(false);
    const [showVideoDetails, setShowVideoDetails] = React.useState<boolean>(false);
    const [searchText, setSearchText] = React.useState<string>("");
    const [searchResult, setSearchResult] = React.useState<[]>([]);
    const [videoDetails, setVideoDetails] = React.useState<string>("");

    message.config({
        maxCount: 3,
    });

    const handleOnClickSearch = () => {
        console.log('chamou')
        if(searchText.trim().length > 0) { 
            setLoading(true);
            setShowSearchResults(true);
            search(searchText)
            .then(response => {
                console.log(response);
                setSearchResult([]);
            })
            .catch(err => {
                console.log(err);
                message.error("Erro inesperado.");
            })
            .finally(() => {
                setLoading(false);
            })
        } else {
            message.info("Campo de pesquisa em branco.")
        }
    };

    const handleOnClickVideo = (videoId: string) => {
        setShowVideoDetails(true);
        setLoading(true);
        loadDetails(videoId)
        .then(response => {
            console.log(response);
            setVideoDetails('');
        })
        .catch(err => {
            console.log(err);
            message.error("Erro inesperado.");
        })
        .finally(() => {
            setLoading(false);
        })
    }

    return (
        <>
            <Row justify="center" align="middle" className={showSearchResults ? 'sb-animation' : 'sb-container'}>
                <Col xs={20} md={12} style={{maxWidth: '550px'}}>
                    <Search
                        placeholder="Pesquisar"
                        aria-label="campo de pesquisa"
                        onChange={e => setSearchText(e.target.value)}
                        enterButton="Buscar"
                        onSearch={() => handleOnClickSearch()}
                    />
                </Col>
            </Row>
            <SearchResults
                loading={showSearchResults && loading}
                visible={showSearchResults}
                content={searchResult}
                onClick={value => handleOnClickVideo(value)}
            />
            <VideoContent
                loading={showVideoDetails && loading}
                visible={showVideoDetails}
                content={videoDetails}
            />
        </>
    );
};