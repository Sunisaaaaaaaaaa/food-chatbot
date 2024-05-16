import React, { useState } from 'react'
import Message from './Message'
import MessageOwner from './MessageOwner'
import '../index.css'
import Point from './Point'

function Messages({messagesArray}) {
  // const messagesArray = ['a', 'b','qwfo','sljfiksd','askflsf','askflasj','Thats awesome. I think our users will really appreciate the improvements.']
  // const messagesArrayOwner = ['owner','sfh','asasldklsdl laskdflaksl;dkl;d laskdlkasld;kals ksadlsldlks sjdlasdhu','sdfjksfkdjfkjsdfl']

  let i = 0
  return (
    <div>
      {messagesArray.map((message, index) => {
        return (
          <div key={index}>
            {message.type === 'user' ? (
              /* Render user-specific content here */
              <MessageOwner text={message.content} />
            ) : message.type === 'bot' ? (
              /* Render content for other types (e.g., bot) */
              <Message text={message.content} />
            ) : (
              <Point name={message.content} id={i++} />
            )}
          </div>
        )
      })}
    </div>
  )
}

export default Messages