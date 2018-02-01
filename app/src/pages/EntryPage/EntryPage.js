import React, { Component } from 'react'

class EntryPage extends Component {
  render () {
    const personInfo = {...this.props.person}
    const personName = personInfo.name || 'Unknown Name'
    const personPicture = personInfo.picture ? <img src={personInfo.picture} alt={personName} /> : <p>no image</p>
    const loading = this.props.person.fetching && <p>loading....</p>
    return (
      <div>
        <h2>Entry Page</h2>
        <button onClick={this.props.doFetchPerson}>Click to load a person</button>
        <p>{personName}</p>
        {personPicture}
        {loading}
      </div>
    )
  }
}

export default EntryPage
