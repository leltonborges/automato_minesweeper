use std::collections::BTreeSet;
use std::sync::{Arc, Mutex};
use std::cmp::Ordering;
use super::board::{Cell};

#[derive(Debug)]
struct Node {
    position: Cell,
    children: Mutex<BTreeSet<Arc<Cell>>>,
}

impl Node {
    fn new(position: Cell) -> Arc<Self> {
        Arc::new(Node {
            position,
            children: Mutex::new(BTreeSet::new()),
        })
    }

    fn add_child(&self, child: Arc<Cell>) {
        self.children.lock().unwrap().insert(child);
    }
}

impl PartialEq for Node {
    fn eq(&self, other: &Self) -> bool {
        self.position == other.position
    }
}

impl Eq for Node {}

impl PartialOrd for Node {
    fn partial_cmp(&self, other: &Self) -> Option<Ordering> {
        Some(self.position.cmp(&other.position))
    }
}

impl Ord for Node {
    fn cmp(&self, other: &Self) -> Ordering {
        self.position.cmp(&other.position)
    }
}
