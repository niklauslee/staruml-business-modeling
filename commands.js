/*
 * Copyright (c) 2022 Minkyu Lee. All rights reserved.
 *
 * NOTICE:  All information contained herein is, and remains the
 * property of Minkyu Lee. The intellectual and technical concepts
 * contained herein are proprietary to Minkyu Lee and may be covered
 * by Republic of Korea and Foreign Patents, patents in process,
 * and are protected by trade secret or copyright law.
 * Dissemination of this information or reproduction of this material
 * is strictly forbidden unless prior written permission is obtained
 * from Minkyu Lee (niklaus.lee@gmail.com).
 *
 */

/* global app */

const path = require('path')

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
  const fullPath = path.join(__dirname, 'profiles/BusinessModelingProfile.mfj')
  if (app.commands.execute('uml:apply-profile', fullPath, 'BusinessModelingProfile')) {
    app.toast.info('BusinessModelingProfile is successfully applied. Look at under Project.')
  }
}

app.commands.register('bm:new-from-template', handleNewFromTemplate)
app.commands.register('bm:add-element', handleAddElement)
app.commands.register('bm:apply-profile.business-modeling', handleApplyBusinessModelingProfile)
