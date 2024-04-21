use once_cell::sync::Lazy;
use crate::property::{Config, load_properties};

pub(crate) static MOVEMENTS: [(isize, isize); 4] = [(0, 1), (1, 0), (0, -1), (-1, 0)];

pub(crate) static PROPERTIES: Lazy<Config> = Lazy::new(|| load_properties().expect("Failed to load configuration."));