/*
 * Copyright (c) 2022 Minkyu Lee. All rights reserved.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a
 * copy of this software and associated documentation files (the "Software"),
 * to deal in the Software without restriction, including without limitation
 * the rights to use, copy, modify, merge, publish, distribute, sublicense,
 * and/or sell copies of the Software, and to permit persons to whom the
 * Software is furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
 * FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER
 * DEALINGS IN THE SOFTWARE.
 *
 */

/* global app */

function getStereotype (name) {
  return app.repository.find(e => e.name === name && e instanceof type.UMLStereotype)
}

function handleNewFromTemplate (template) {
  return app.commands.execute('uml:new-from-template', template, __dirname)
}

function handleAddElement (options) {
  let stereotype = getStereotype(options.stereotype)
  if (!stereotype) {
    app.commands.execute('bm:apply-profile.business-modeling')
    stereotype = getStereotype(options.stereotype)
  }
  options = Object.assign(options, {
    'model-init': {
      'stereotype': stereotype
    },
    'view-init': {
      'stereotypeDisplay': 'icon',
      'suppressAttributes': true,
      'suppressOperations': true
    }
  })
  return app.factory.createModelAndView(options)
}

function handleApplyBusinessModelingProfile () {
  const fullPath = __dirname + '/profiles/BusinessModelingProfile.mfj'
  if (app.commands.execute('uml:apply-profile', fullPath, 'BusinessModelingProfile')) {
    app.toast.info('BusinessModelingProfile is successfully applied. Look at under Project.')
  }
}

app.commands.register('bm:new-from-template', handleNewFromTemplate)
app.commands.register('bm:add-element', handleAddElement)
app.commands.register('bm:apply-profile.business-modeling', handleApplyBusinessModelingProfile)
