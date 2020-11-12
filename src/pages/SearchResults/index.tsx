import { LoadingOutlined } from '@ant-design/icons';
import { Button, Col, message, Row, Spin } from 'antd';
import Text from 'antd/lib/typography/Text';
import Title from 'antd/lib/typography/Title';
import * as React from 'react';
import { Link, useParams } from 'react-router-dom';
import { thumbnailApi } from '../../api';
import { ErrorMessage } from '../../components/ErrorMessage';
import { search, SearchListResponse, SearchResult } from './actions';
import './styles.less';


export const SearchResults = () => {

    interface ParamTypes { 
        q: string
    }
    const { q } = useParams<ParamTypes>();

    const [loading, setLoading] = React.useState<boolean>(false);
    const [loadingNextPage, setLoadingNextPage] = React.useState<boolean>(false);
    const [searchResponse, setSearchResponse] = React.useState<SearchListResponse>();
    const [searchResults, setSearchResults] = React.useState<SearchResult[]>([]);
    const [lastQ, setLastQ] = React.useState<string>("");

    // React.useEffect(() => {
    //     document.querySelector('.content-container')?.addEventListener("scroll", () => handleScroll());
    // }, []);

    React.useEffect(() => {
        if(q !== lastQ) {
            handleSearch();
        }
    }, [q]);

    const handleSearch = () => {
        setSearchResults([]);
        setLoading(true);
        setLastQ(q);
        search(q)
        .then((res) => {
            setSearchResponse(res);
            setSearchResults(res.items);
        })
        .catch((err) => {
            console.log(err);
            message.error("Erro ao carregar resultados da pesquisa");
        })
        .finally(() => {
            setLoading(false);
        });
    }


    const handleNextPageSearch = () => {
        setLoadingNextPage(true);
        search(q, searchResponse!.nextPageToken)
        .then((res) => {
            setSearchResponse(res);
            setSearchResults([...searchResults, ...res.items]);
        })
        .catch((err) => {
            console.log(err);
            message.error("Erro ao carregar resultados da pesquisa");
        })
        .finally(() => {
            setLoadingNextPage(false);
        })
    }

    // const handleScroll = () => {
    //     console.log(searchResponse?.nextPageToken)
    //     if(searchResponse?.nextPageToken
    //         && !loadingNextPage
    //         && isInViewport(document.getElementById('loadMore'))) {
    //         handleNextPageSearch();
    //     }
    // }

    const displayThumb = (videoId: string, alt: string) => {
        let imgSize: string;
        const img = new Image();
        img.className = 'thumbnail';
        imgSize = 'mqdefault';
        img.src = `${thumbnailApi.defaults.baseURL}/${videoId}/${imgSize}.jpg`;

        return <img src={img.src} className={img.className} alt={alt}/>;
    }

    return(
        <Spin spinning={loading} indicator={<LoadingOutlined style={{fontSize: '48px'}}/>}>
            {
            searchResults && searchResults.length > 0 ?
                <Row justify='center' style={{marginTop: '24px'}}>
                    <Col xs={20} sm={20} md={16}>
                        <Row align='top' justify='space-around' gutter={24}>
                            {
                            searchResults.map(element => {
                                return(
                                    <Col xs={24} sm={12} md={8} xl={6} className='content-card'>
                                        <Link to={`/video/${element.videoId}`}  style={{display: 'flex', flexDirection: 'column'}}>
                                            <div className={'thumbnail-container'}>
                                                {displayThumb(element.videoId, element.title)}
                                            </div>
                                            <Title level={5}>{element.title}</Title>
                                            <Text strong>
                                                {element.channelTitle}
                                            </Text>
                                            <Text>
                                                {element.description}
                                            </Text>
                                        </Link>
                                    </Col>
                                )
                            })
                            }
                        </Row>
                        {/* {searchResponse?.nextPageToken ?
                            <Row id='loadMore'>
                                <Spin spinning={loadingNextPage}>
                                    <div style={{padding: '24px'}}>
                                    </div>
                                </Spin>
                            </Row>
                        : null} */}
                        {searchResponse?.nextPageToken ?
                            <Row justify="center">
                                <Spin spinning={loadingNextPage}>
                                    <Row justify="center" style={{padding: '24px'}}>
                                        <Button onClick={() => handleNextPageSearch()} className='box-shadow' size='large'>Carregar mais</Button>
                                    </Row>
                                </Spin>
                            </Row>
                        : null }
                    </Col>
                </Row>
            :
                loading ? null : <ErrorMessage />
            }
        </Spin>
    );
}