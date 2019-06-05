import React from 'react';



class News extends React.Component {
    constructor(props){
        super(props);
    }
    
    // handleClick(url) {
    //     return event => {
            
    //     }
    // }

    render() {
        const newsList = this.props.news.map((el, idx) => {
            return (
                <li key={`news-`.concat(idx)}>
                    <a href={el.url}>
                        {/* <img className="details-page-news-image" src={el.image}/> */}
                        <object className="details-page-news-image" data={el.image} type="image/png">
                            <img className="details-page-news-image" src={window.newsDefaultImgURL} alt="default-image"/>
                        </object>
                        <div className="details-page-news-content">
                            <span className="details-page-news-source">{el.source}</span>
                            <br/>
                            <span className="details-page-news-headline">{el.headline}</span>
                        </div>
                    </a>
                </li>

            )
        })

        return (
            <ul className="details-page-news-list">
                {newsList}
            </ul>
        )
    }
}

export default News;