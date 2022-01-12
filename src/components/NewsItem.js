import React from 'react'


const NewsItem = (props)=> {

        let {title, description, imageURL, newsurl, author, date} = props; // destructuring
        return (
            <div>
                <div className="card" style={{width: "18rem"}}>
                    <img src={imageURL} className="card-img-top" alt="..." />
                    <div className ="card-body">
                    <h5 className ="card-title">{title}</h5>
                    <p className ="card-text">{description}</p>
                    <p className='card-text'><small className='text-muted'>By {!author?"Unknown":author} on {new Date(date).toUTCString()}</small></p>
                    <a rel='noreferrer' href={newsurl} target="_blank" className ="btn btn-primary">Read More</a>
                    </div>
                </div>
            </div>
        )
}


export default NewsItem
