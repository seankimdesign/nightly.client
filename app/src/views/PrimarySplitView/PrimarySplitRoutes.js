import React from 'react'
import { Route, Switch } from 'react-router-dom'

import EntryPage from 'Root/pages/EntryPage/'
import NewPostPage from 'Root/pages/NewPostPage/'
import LoginPage from 'Root/pages/LoginPage/'

export default () => (
  <Switch>
    <Route exact path='/' component={EntryPage} />
    <Route path='/write' component={NewPostPage} />
    <Route path='/login' component={LoginPage} />
    <Route render={() => (<div>ERROR</div>)} />
  </Switch>
)
