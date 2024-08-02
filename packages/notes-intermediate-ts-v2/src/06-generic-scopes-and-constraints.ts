//* Generic Constraints - A motivating use case
const phoneList = [
  { customerId: '0001', areaCode: '321', num: '123-4566' },
  { customerId: '0002', areaCode: '174', num: '142-3626' },
  { customerId: '0003', areaCode: '192', num: '012-7190' },
  { customerId: '0005', areaCode: '402', num: '652-5782' },
  { customerId: '0004', areaCode: '301', num: '184-8501' },
]
const phoneDict = {
  '0001': {
    customerId: '0001',
    areaCode: '321',
    num: '123-4566',
  },
  '0002': {
    customerId: '0002',
    areaCode: '174',
    num: '142-3626',
  },
  /*... and so on */
}

function listToDict<T>(
  list: T[], // array as input
  idGen: (arg: T) => string, // fn for obtaining item's id
): { [k: string]: T } {
  // create dict to fill
  const dict: { [k: string]: T } = {}

  for (let item of list) {
    // for each item
    dict[idGen(item)] = item // make a key store in dict
  }

  return dict // result
}

// Suppose we already have an ID instead of CustomerID, and we do not pass in the callback,but with this approach we have lost the generic(flexible ) sense of operation

interface HasId {
  id: string
}
interface Dict<T> {
  [k: string]: T
}

// function listToDict2(list: HasId[]): Dict<HasId> {
function listToDict2<T extends HasId>(list: T[]): Dict<T> {
  const dict: Dict<T> = {}

  list.forEach((item) => {
    dict[item.id] = item
  })

  return dict
}

//* Scopes and Type Parameters

// Type Params work as variable when it comes to scoping
function eatApple(bowl: any, eater: (arg: any) => void) {}

function receiveFruitBasket(bowl: any) {
  console.log('Thanks for the fruit basket!')
  // only `bowl` can be accessed here
  eatApple(bowl, (apple: any) => {
    // both `bowl` and `apple` can be accessed here
  })
}

// outer function
function tupleCreator<T>(first: T) {
  // inner function
  return function finish<S>(last: S): [T, S] {
    return [first, last]
  }
}
const finishTuple = tupleCreator(3 as const)
const t1 = finishTuple(null)
const t2 = finishTuple([4, 8, 15, 16, 23, 42])

//* Best practices
// interface HasId {
//   id: string
// }
// interface Dict<T> {
//   [k: string]: T
// }

function example1<T extends HasId[]>(list: T) {
  return list.pop()
  //      ^?
}
function example2<T extends HasId>(list: T[]) {
  return list.pop()
  //      ^?
}

class Payment implements HasId {
  static #next_id_counter = 1
  id = `pmnt_${Payment.#next_id_counter++}`
}
class Invoice implements HasId {
  static #next_id_counter = 1
  id = `invc_${Invoice.#next_id_counter++}`
}

const result1 = example1([
  //   ^?
  new Payment(),
  new Invoice(),
  new Payment(),
])

const result2 = example2([
  //   ^?
  new Payment(),
  new Invoice(),
  new Payment(),
])

export default {}
