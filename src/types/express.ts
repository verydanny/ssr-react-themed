import * as express from 'express'
import * as core from "express-serve-static-core"
import { Store } from 'redux'

declare module 'express' {
  interface StoreRequestT extends express.Request {
    store?: any
  }
}