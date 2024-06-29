module Trestle
  module ActiveStorage
    class Engine < Rails::Engine
      config.assets.precompile << 'activestorage.js' << 'trestle/active_storage_fields.js'
      config.assets.precompile << 'trestle/active_storage_fields.css'

      config.to_prepare do
        Trestle::ResourceController.send(:include, Trestle::ActiveStorage::ControllerConcern)
      end

      initializer :extensions do
        Trestle::Resource.send(:include, Trestle::ActiveStorage::Resource)
        Trestle::Resource::Builder.send(:include, Trestle::ActiveStorage::Builder)
      end
    end
  end
end
