import React, { useEffect, useState } from 'react';


const Quotes = () => {
    const [quote, setQuote] = useState('');
    const [author, setAuthor] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true)
        fetch("https://type.fit/api/quotes")
          .then(response => response.json())
          .then(data => {
            let rundomQuote = Math.floor(Math.random() * data.length);
            setQuote(data[rundomQuote].text)
            setAuthor(data[rundomQuote].author)
        })
          .finally(() => {
            setLoading(false)
          })
      }, [])

    return (
        <div>
            {loading ? (<div>Loading...</div>): (
                <div>
                    <p className="blockquote fst-italic fw-bold">{quote}</p>
                    <p className="fst-italic">{author}</p> 
                </div>
            )}
        </div>

    )
}

export default Quotes;

