import nfs from 'fs'
import pify from 'pify'

export const fs = pify(nfs)
