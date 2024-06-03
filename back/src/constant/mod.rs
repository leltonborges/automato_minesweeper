use std::clone::Clone;
use std::f32::consts::PI;
use std::sync::{Arc, Mutex};
use std::time::{SystemTime, UNIX_EPOCH};

use once_cell::sync::Lazy;

use crate::minesweeper::board::{Cell, ConfigMinesweeper, Minesweeper};
use crate::minesweeper::node::Node;
use crate::property::{Config, load_properties, MinesweeperDefault};

pub(crate) static MOVEMENTS: [(isize, isize); 4] = [(0, 1), (1, 0), (0, -1), (-1, 0)];

pub(crate) static PROPERTIES: Lazy<Config> = Lazy::new(|| load_properties().expect("Failed to load configuration."));
pub(crate) static DEFAULT_MINESWEEPER: Lazy<ConfigMinesweeper> = Lazy::new(|| {
    let default:MinesweeperDefault = load_properties().unwrap().minesweeper();
    ConfigMinesweeper::from(default)
});

pub static MINESWEEPER: Lazy<Arc<Mutex<Minesweeper>>> = Lazy::new(|| {
    let minesweeper = Minesweeper::new_random(DEFAULT_MINESWEEPER.clone());
    let mutex = Mutex::new(minesweeper);
    Arc::new(mutex)
});

pub(crate) static TREE_NODE: Lazy<Arc<Node>> = Lazy::new(|| {
    let arc: Arc<Node> = Node::new(Cell::new_free(1, 3));
    arc.clone()
});

pub fn process_nanosecond() -> u32 {
    let start = SystemTime::now();
    let since_the_epoch = start.duration_since(UNIX_EPOCH).expect("Time went backwards");
    since_the_epoch.subsec_nanos()
}

pub fn process_rule() -> f32 {
    PI * (process_nanosecond() as f32)
}
