package lenconv

func MToIn(m Meter) Inch {
	return Inch(3.28083 * m)
}

func InToM(in Inch) Meter {
	return Meter(0.3048 * in)
}
