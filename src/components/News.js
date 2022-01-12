import React from 'react'
import PropTypes from 'prop-types'
import { useEffect, useState } from 'react';
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import InfiniteScroll from 'react-infinite-scroll-component';


const News = (props) => {

    const [article, setArticle] = useState([])
    const [loading, setLoading] = useState(true)
    const [page, setPage] = useState(1)
    const [totalResults, setTotalResults] = useState(0)



    const updateNews =  async ()=> {
        setLoading(true)
        const url = ` https://newsapi.org/v2/top-headlines?country=in&category=${props.category}&apiKey=${props.apikey}&page=${page}&pageSize=${props.pageSize}`;
        let data = await fetch(url);
        let parsedata = await data.json();
        // console.log(data);
        setArticle(parsedata.articles)
        setTotalResults(parsedata.totalResults)
        setLoading(false)
        
    }

    useEffect(() => {
        updateNews();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
   

    // const handleNextClick = async () => {
     
    //     setPage(page+1)
    //     updateNews()

    // };

    // const handlePrevClick = async () => {
    //     setPage(page-1)
    //     updateNews()
    // };

    const fetchMoreData = async () => {
        const url = ` https://newsapi.org/v2/top-headlines?country=in&category=${props.category}&apiKey=${props.apikey}&page=${page + 1}&pageSize=${props.pageSize}`;
        setPage(page+1)
        setLoading(true)
        let data = await fetch(url);
        let parsedata = await data.json();
        // console.log(data);
       
        setArticle(article.concat(parsedata.articles))
        setTotalResults(parsedata.totalResults)
        setLoading(false)
      };


        return (
            <div className="container my-4">
                <h2>Current Indo-World Affairs</h2>
                {/* {this.state.loading && <Spinner/>} */}
                <InfiniteScroll
                    dataLength={article.length}
                    next={fetchMoreData}
                    hasMore={article.length!==totalResults}
                    loader={<Spinner />}
                >
                    <div className="container">
                    {loading}
                    <div className="row">
                        {article.map((element) => {
                            return <div className="col-md-3 my-4" key={element.url}>
                                <NewsItem title={element.title ? element.title : ""} description={element.description ? element.description : ""} imageURL={element.urlToImage} newsurl={element.url} author={element.author} date={element.publishedAt} />
                            </div>


                })}
                    </div>
            </div>
                </InfiniteScroll>
                
            </div>
        )
    }


News.defaultProps = {
    country: 'in',
    pageSize: 8,
    category:'general'
}
News.propsType = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    apikey: PropTypes.string,
}

export default News
