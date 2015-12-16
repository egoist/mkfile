import nfs from 'fs'
import pathExists from 'path-exists'
import pify from 'pify'

export const fs = pify(nfs)
export const exists = pify(pathExists)
