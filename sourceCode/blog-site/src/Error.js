import React from 'react'
import { useRouteError } from 'react-router-dom'
import {errorTextGenerator} from './functions'

export default function ErrorComponent() {
  const error = useRouteError();
  return (
    <h2 className="error">{errorTextGenerator(error)}</h2>
  )
}
