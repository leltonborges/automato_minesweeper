use clap::crate_version;
use paperclip::v2::models::{Api, DefaultApiRaw, DefaultParameterRaw, DefaultResponseRaw, DefaultSchemaRaw, Info, Tag};

use crate::property::load_properties;

pub fn api_config() -> Api<DefaultParameterRaw, DefaultResponseRaw, DefaultSchemaRaw> {
    let config = load_properties().expect("Failed to load configuration.");
    let mut spec = DefaultApiRaw::default();
    spec.tags = vec![
        Tag {
            name: "Minefield".to_string(),
            description: Some("endpoints with validation minesweeper".to_string()),
            external_docs: None,
        },
        Tag {
            name: "Tree".to_string(),
            description: Some("Images of cats".to_string()),
            external_docs: None,
        },
        Tag {
            name: "Api reference".to_string(),
            description: Some("List of all api endpoints".to_string()),
            external_docs: None,
        },
    ];
    spec.info = Info {
        version: crate_version!().to_string(),
        title: config.name(),
        description: Some(config.description()),
        ..Default::default()
    };
    spec
}